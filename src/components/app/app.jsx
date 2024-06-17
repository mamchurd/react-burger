import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import styles from './app.module.css';

import { ForgotPassword, Home, Login, NotFound404, PersonalPage, Profile, Register, ResetPassword } from '../../pages';
import { fetchUser } from '../../services/slices/auth';
import { fetchIngredients } from '../../services/slices/load-ingredients';
import {
  URL_ANY,
  URL_FORGOT_PASSWORD,
  URL_HOME,
  URL_INGREDIENTS,
  URL_LOGIN,
  URL_PERSONAL_PAGE,
  URL_REGISTER,
  URL_RESET_PASSWORD
} from '../../utils/routes';
import AppHeader from '../app-header/app-header';
import IngredientsDetails from '../burger-ingredients/ingredients-details/ingredients-details';
import Modal from '../modal/modal';
import { OnlyAuthRoute, OnlyUnAuthRoute } from '../protected-route/protected-route';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      <div className={styles.main}>
        <Routes location={background || location}>
          <Route path={URL_HOME} element={<Home />} />
          <Route path={`${URL_INGREDIENTS}/:ingredientId`} element={<IngredientsDetails />} />
          <Route path={URL_LOGIN} element={<OnlyUnAuthRoute component={<Login />} />} />
          <Route path={URL_REGISTER} element={<OnlyUnAuthRoute component={<Register />} />} />
          <Route path={URL_FORGOT_PASSWORD} element={<OnlyUnAuthRoute component={<ForgotPassword />} />} />
          <Route path={URL_RESET_PASSWORD} element={<OnlyUnAuthRoute component={<ResetPassword />} />} />
          <Route path={URL_PERSONAL_PAGE} element={<OnlyAuthRoute component={<PersonalPage />} />}>
            <Route index element={<Profile />} />
            <Route path={URL_ANY} element={<NotFound404 />} />
          </Route>
          <Route path={URL_ANY} element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path={`${URL_INGREDIENTS}/:ingredientId`}
              element={
                <Modal onClose={handleModalClose}>
                  <IngredientsDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
