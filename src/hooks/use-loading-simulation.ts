import { useState, useEffect, useCallback } from "react";

interface UseLoadingSimulationOptions {
  initialDelay?: number;
  autoLoad?: boolean;
}

export function useLoadingSimulation(options: UseLoadingSimulationOptions = {}) {
  const { initialDelay = 800, autoLoad = true } = options;
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (autoLoad) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, initialDelay);
      return () => clearTimeout(timer);
    }
  }, [autoLoad, initialDelay]);

  const simulateAction = useCallback(async <T>(
    action: () => T | Promise<T>,
    delay: number = 1000
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await action();
          setIsLoading(false);
          resolve(result);
        } catch (err) {
          setIsLoading(false);
          const errorMessage = err instanceof Error ? err.message : "An error occurred";
          setError(errorMessage);
          reject(err);
        }
      }, delay);
    });
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    setIsLoading,
    setError,
    simulateAction,
    reset,
  };
}

// Hook for simulating async form submissions
export function useFormSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitForm = useCallback(async (
    onSuccess?: () => void,
    delay: number = 1500
  ) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        onSuccess?.();
        resolve();
      }, delay);
    });
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setSubmitSuccess(false);
  }, []);

  return {
    isSubmitting,
    submitSuccess,
    submitForm,
    reset,
  };
}
