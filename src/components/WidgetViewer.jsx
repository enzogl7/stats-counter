import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import DeathIcon from '../assets/death-icon.png';
import themes from './ThemesDeath';
import PlatIcon from '../assets/plat-icon.png';
import { useSearchParams } from 'react-router-dom';

const defaultTheme = {
  bg: 'bg-zinc-800',
  text: 'text-white',
};

export default function WidgetViewer() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [type, setType] = useState('');
  const [trophiesEarned, setTrophiesEarned] = useState(0);
  const [trophiesTotal, setTrophiesTotal] = useState(0); 
  const [searchParams] = useSearchParams();
  const themeParam = searchParams.get('theme') || 'default';
  const theme = themes[themeParam] || themes.default;

  useEffect(() => {
    console.log("teme text: ", theme.text);
    let ignore = false;
    const fetchWidget = async () => {
      const { data, error } = await supabase
        .from('widgets')
        .select('value, type, total')
        .eq('id', id)
        .single();

        if (!ignore && data?.value !== undefined) {
          setValue(data.value);
          setType(data.type);
          if (data.type === 'trophies') {
            setTrophiesEarned(data.value);
            setTrophiesTotal(data.total || 0);
          }
        }
    };

    fetchWidget();


    const channel = supabase
      .channel(`realtime-widget-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'widgets',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          const newValue = payload.new.value;
          const newTotal = payload.new.total;
          setValue(newValue);
          setType(payload.new.type);
          if (payload.new.type === 'trophies') {
            setTrophiesEarned(newValue);
            setTrophiesTotal(newTotal);
          }
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };  
  }, [id]);

  return (
    <div>
      {type === 'deaths' && (
      <div className={`mb-4 rounded-full ${theme.bg} p-4 w-35 h-24 flex items-center justify-center mx-auto ${themeParam !== 'basic' ? 'border border-zinc-700' : '' }`}> 
          <div key={value} className={`text-4xl font-bold ${theme.text} flex items-center justify-center gap-2 transition-transform duration-300`}>
            <img src={DeathIcon} alt="Ícone mortes/Death icon" className={`w-10 h-10 object-contain {theme.iconFilter}`} />
            <span>{value}</span>
          </div>
        </div>
      )}

      {type === 'trophies' && (
      <div className={`mb-4 rounded-full ${theme.bg} p-4 w-75 h-24 flex items-center justify-center mx-auto ${themeParam !== 'basic' ? 'border border-zinc-700' : '' }`}> 
          <div className={`text-4xl font-bold ${theme === themes.default ? 'text-white' : theme.text}
          ${theme === themes.basic ? 'text-white' : theme.text} w-60 flex items-center justify-center gap-2 transition-transform duration-300`}>
            <img src={PlatIcon} alt="Troféu de Platina/Platinum trophy PS" className={`w-10 h-10 object-contain {theme.iconFilter}`}/>
            <span>{trophiesEarned} / {trophiesTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}