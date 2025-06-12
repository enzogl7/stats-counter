// src/hooks/useWidgetLoader.js

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export function useWidgetLoader() {
  const { t } = useTranslation();
  const [carregando, setCarregando] = useState(false);

  const carregarWidgetPorId = async (widgetId, expectedType) => {
    if (!widgetId || !widgetId.trim()) {
      toast.warn(t('null_id'));
      return null;
    }

    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('widgets')
        .select('id, value, type')
        .eq('id', widgetId.trim())
        .single();

      if (error || !data) {
        toast.error(t('manual_widget_not_found'));
        return null;
      }

      if (data.type !== expectedType) {
        toast.error(t('invalid_widget_type'));
        return null;
      }

      toast.success(t('manual_widget_success'));
      return data;

    } catch (err) {
      console.error("Erro ao carregar widget:", err);
      toast.error("Ocorreu um erro inesperado.");
      return null;
    } finally {
      setCarregando(false);
    }
  };

  return { carregando, carregarWidgetPorId };
}