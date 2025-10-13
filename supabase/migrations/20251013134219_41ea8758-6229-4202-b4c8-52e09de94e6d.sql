-- Add UPDATE and DELETE policies for orders table to allow users to modify/cancel pending orders

CREATE POLICY "Users can update pending orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can cancel pending orders"
ON public.orders
FOR DELETE
USING (auth.uid() = user_id AND status = 'pending');