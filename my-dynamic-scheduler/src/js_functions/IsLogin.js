export const logIn = (name) => {
        localStorage.setItem('auth', true);
        localStorage.setItem('username', name);
    }

export const logOut = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
    }
export const isLogin = () => {
        if (localStorage.getItem('auth')) {
            return true;
        }

        return false;
    }


