import { useHistory, useLocation, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useHistory();
    const location = useLocation();
    const params = useParams();

    return (
      <Component
        navigate={navigate}
        location={location}
        params={params}
        {...props}
      />
    );
  };

  return Wrapper;
};
