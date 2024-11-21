import { useUser } from "../../util/UserContext";

const HomePage = () => {
  const { user, loading } = useUser();
  if (loading) {
    return <div>loading</div>;
  }
  return <div>{user.fullName}</div>;
};

export default HomePage;
