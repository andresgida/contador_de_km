import { supabase, supabaseConfigError } from "./supabase";

function assertSupabase() {
  if (!supabase) {
    throw new Error(supabaseConfigError);
  }
}

export async function getInitialData() {
  assertSupabase();
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

export async function updateInitialData(mileage, initialDate) {
  assertSupabase();
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

export async function saveCalculation(calculation) {
  assertSupabase();
  const { error } = await supabase
    .from("calculations")
    .insert([calculation]);

  if (error) {
    throw error;
  }
}