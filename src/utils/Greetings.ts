export const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Good Morning";
    } else if (hour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
};
