const Store = {
    state: {
        user: null,
        theme: 'light',
        xp: 0
    },
    setUser(user) {
        this.state.user = user;
        document.dispatchEvent(new CustomEvent('state-changed', { detail: this.state }));
    }
};