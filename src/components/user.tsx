import * as React from "react";

export type UserInfo = {
  name: string;
  age: string;
  address: string;
};

export default function User(props: { id: string }) {
  const [user, setUser] = React.useState<UserInfo | null>(null);

  async function fetchUserDeta(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }

  React.useEffect(() => {
    fetchUserDeta(props.id);
  }, [props.id]);

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </details>
  );
}
