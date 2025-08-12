/* eslint-disable */
import * as React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@redocly/theme/components/Button/Button';

import { FormControl, FormLabel, TextField, TokenResult, ErrorMessage } from './components';

interface OpenApiTryItSecurityPanel {
  server: {
    url: string;
    variables: { [name: string]: string };
  };
  operation: any;
  onChange?: any;
  OAuth2: any; // OAuth2 helper functions
}

const SESSION_STORAGE_PREFIX = 'try-it.';
function usePersistedState(key: string, defaultValue: string) {
  // save values in session storage
  const [state, setState] = useState(
    sessionStorage.getItem(SESSION_STORAGE_PREFIX + key) || defaultValue,
  );
  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_PREFIX + key, state);
  }, [state]);
  return [state, setState];
}

export function OpenApiTryItSecurityPanel(props: OpenApiTryItSecurityPanel) {
  const { server, operation, onChange, OAuth2 } = props;

  // let's take the first scheme for example
  const authScheme = operation.security[0].schemes[0];
  //const userClaims = usePageProps().variables?.user || {}; // if needed

  // use external request to get the token payload from the server
  // ask user for clientId and clientSecret

  const [clientId, setClientId] = usePersistedState('clientId', '');
  const [clientSecret, setClientSecret] = usePersistedState('clientSecret', '');
  const [token, setToken] = usePersistedState('token', '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // set initial token from session storage
    if (token) {
      onChange({
        [authScheme.id]: token,
      });
    }
  }, []);

  const requestToken = async (e: SubmitEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      // const token = await fetch(`${server.url}/api/auth/custom-token`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     clientId,
      //     clientSecret,
      //   }),
      // }).then(async res => {
      //   if (res.ok) {
      //     return res.json();
      //   } else {
      //     throw new Error(await res.text());
      //   }
      // });

      // simulate real request using setTimeout
      const token = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({ accessToken: 'abcd1234', entitlement: 'MEMBER', userId: clientId });
        }, 1000),
      );

      setToken(JSON.stringify(token));

      onChange({
        [authScheme.id]: token,
      });

      // for basic auth
      // onChange({
      //   [authScheme.id]: { username: 'xxx', password: 'xxx' },
      // });

      // for oauth2
      // onChange({
      //   [authScheme.id]: { token: { access_token: 'test' } },
      // });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 style={{ marginTop: 0 }}> Custom token flow: </h4>
      <form onSubmitCapture={(e) => requestToken(e)} action="#">
        <FormControl>
          <FormLabel required>Client ID</FormLabel>
          <TextField
            required
            type="text"
            placeholder="Client ID"
            onChange={(e) => setClientId(e.target.value)}
            value={clientId}
          />
        </FormControl>
        <FormControl>
          <FormLabel required>Client Secret</FormLabel>
          <TextField
            type="password"
            required
            placeholder="Client Secret"
            onChange={(e) => setClientSecret(e.target.value)}
            value={clientSecret}
          />
        </FormControl>
        <div>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Loading' : 'Request token'}
          </Button>
        </div>
        <FormControl style={{ marginTop: '10px' }}>
          <FormLabel>Token: </FormLabel>
          <TokenResult>{token}</TokenResult>
        </FormControl>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </div>
  );
}
