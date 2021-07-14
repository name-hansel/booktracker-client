import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLibraryData } from "../../redux/Library/library.actions";
import UserContext from "../../context/user";
import { State } from "../../interfaces";
import Spinner from "../../components/Spinner";

const Library: React.FC = () => {
  const dispatch = useDispatch();
  const library = useSelector((state: State) => state.library);
  const { userState } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!userState.loading) dispatch(getLibraryData(userState.user._id));
  }, []);

  return !library.loading ? (
    library.library.length === 0 ? (
      <h1>No books</h1>
    ) : (
      <h1>Hey queen</h1>
    )
  ) : (
    <Spinner />
  );
};

export default Library;
