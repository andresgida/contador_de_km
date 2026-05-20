import { useEffect, useState } from "react";

import { getInitialData } from "../services/mileageService";

export function useInitialData() {
  const [data, setData] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      const response =
        await getInitialData();

      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
  };
}