import { Fragment } from 'react';

type Props = {
  result: {
    data?: { message?: string };
    fetchError?: string;
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined> | undefined;
  };
};

export const DisplayServerActionResponse = ({ result }: Props) => {
  const { data, fetchError, serverError, validationErrors } = result;

  return (
    <Fragment>
      {data?.message ? <h2 className="my-2 text-2xl">{data.message}</h2> : null}

      {serverError ? (
        <div className="my-2 text-destructive">
          <p>{serverError}</p>
        </div>
      ) : null}

      {fetchError ? (
        <div className="my-2 text-destructive">
          <p>{fetchError}</p>
        </div>
      ) : null}

      {validationErrors ? (
        <div className="my-2 text-destructive">
          {Object.keys(validationErrors).map((key) => (
            <p
              key={key}
            >{`${key}: ${validationErrors && validationErrors[key as keyof typeof validationErrors]}`}</p>
          ))}
        </div>
      ) : null}
    </Fragment>
  );
};
