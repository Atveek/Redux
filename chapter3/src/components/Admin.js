import React from "react";
import {
  useAddAccountMutation,
  useDelAccountMutation,
  useGetAccountsQuery,
  useUpdateAccountMutation,
} from "../Api/adminSlice";

function Admin() {
  const { data, error, isLoading } = useGetAccountsQuery();
  const [addAccount] = useAddAccountMutation();
  const [delAccount] = useDelAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const handleDelete = (id) => {
    delAccount(id);
  };

  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>Admin Component</b>
        </h4>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          data &&
          data.map((account, index) => (
            <p key={index}>
              {account.id && account.id} :{" "}
              {account.amount && account.amount.toString()}
              <button
                onClick={() => updateAccount({ id: account.id, amount: 707 })}
              >
                update Account
              </button>
              <button onClick={() => handleDelete({ id: account.id })}>
                delete Account
              </button>
            </p>
          ))}

        <button
          onClick={() =>
            addAccount({ id: data ? data.length + 1 : 1, amount: 100 })
          }
        >
          Add Account {data && data.length + 1}
        </button>
      </div>
    </div>
  );
}

export default Admin;
