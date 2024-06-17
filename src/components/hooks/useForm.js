import { useState, useCallback } from 'react';

export function useForm(initialState, submitHandler) {
  const [state, setState] = useState(initialState);
  const [errorMessage, setError] = useState('');
  const [isFetch, setFetch] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (submitHandler) {
        const statePure = { ...state };
        delete statePure.wasSubmit;
        setError('');
        setFetch(true);
        submitHandler(statePure);
        setState({ ...state, wasSubmit: true });
      }
    },
    [state, submitHandler]
  );

  const onChange = useCallback(
    (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setState({ ...state, [name]: value });
      setError('');
    },
    [state]
  );

  return { state, isFetch, errorMessage, setState, setFetch, setError, onSubmit, onChange };
}
