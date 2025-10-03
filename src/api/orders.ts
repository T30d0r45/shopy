import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { OrderRequest, CreateOrderRequestDto, UpdateOrderStatusDto, OrderStatus } from '../types';

export function useMyOrderRequests() {
  return useQuery({
    queryKey: ['order-requests', 'mine'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('order_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as OrderRequest[];
    },
  });
}

export function useOrderRequest(id: string) {
  return useQuery({
    queryKey: ['order-requests', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order_requests')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as OrderRequest | null;
    },
    enabled: !!id,
  });
}

export function useAllOrderRequests(status?: OrderStatus) {
  return useQuery({
    queryKey: ['order-requests', 'all', status],
    queryFn: async () => {
      let query = supabase
        .from('order_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as OrderRequest[];
    },
  });
}

export function useCreateOrderRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderRequest: CreateOrderRequestDto) => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('order_requests')
        .insert({
          user_id: user.id,
          ...orderRequest,
        })
        .select()
        .single();

      if (error) throw error;
      return data as OrderRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-requests'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { data, error } = await supabase
        .from('order_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as OrderRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-requests'] });
    },
  });
}

export function useDeleteOrderRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('order_requests').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-requests'] });
    },
  });
}
