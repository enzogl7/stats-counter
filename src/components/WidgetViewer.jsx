import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import DeathIcon from '../assets/death-icon.png';
import themes from './ThemesDeath';

const defaultTheme = {
  bg: 'bg-zinc-800',
  text: 'text-white',
};

export default function WidgetViewer() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const selectedTheme = localStorage.getItem('selectedTheme') || 'default';
  const theme = themes[selectedTheme] || themes.default;
  console.log("Tema selecionado:", selectedTheme);

  useEffect(() => {
    let ignore = false;

    const fetchWidget = async () => {
      const { data, error } = await supabase
        .from('widgets')
        .select('value')
        .eq('id', id)
        .single();

      if (!ignore && data?.value !== undefined) {
        setValue(data.value);
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
          console.log('🔁 Atualização recebida via Realtime:', payload);
          const newValue = payload.new.value;
          setValue(newValue);
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, [id]);

  return (
    <div className={`border-zinc-700 border mb-4 rounded-full ${theme.bg} p-4 w-30 h-24 flex items-center justify-center mx-auto`}>
      <div
        key={value}
        className={`text-4xl font-bold ${theme.text} flex items-center justify-center gap-2 transition-transform duration-300`}
      >
        <img src={DeathIcon} alt="Ícone mortes/Death icon" className="w-6 h-6 object-contain" />
        <span>{value}</span>
      </div>
    </div>
  );
}
