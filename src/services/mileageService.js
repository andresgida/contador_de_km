import { supabase } from "./supabase";

export async function getInitialData() {
  const { data, error } = await supabase
    .from("initial_data")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateInitialData(
  mileage,
  initialDate
) {
  const { error } = await supabase
    .from("initial_data")
    .update({
      mileage,
      initial_date: initialDate,
    })
    .eq("id", 1);

  if (error) {
    throw error;
  }
}

export async function saveCalculation(
  calculation
) {
  const { error } = await supabase
    .from("calculations")
    .insert([calculation]);

  if (error) {
    throw error;
  }
}