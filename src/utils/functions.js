const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

export const categorizedShifts = (data) => {
    const sortedShifts = data && data.length > 0 && [...data].sort((a, b) => a.startTime - b.startTime);

    const now = new Date().getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const categories = {
        'Today': [],
        'Tomorrow': []
    };

    sortedShifts && sortedShifts.length > 0 && sortedShifts.forEach(shift => {
        const shiftDate = new Date(shift.startTime);
        shiftDate.setHours(0, 0, 0, 0);

        const shiftEndTime = new Date(shift.endTime).getTime();
        const isPast = shiftEndTime < now;

        const shiftWithStatus = { ...shift, isPast }; // Add isPast property

        if (shiftDate.getTime() === today.getTime()) {
            categories['Today'].push(shiftWithStatus);
        } else if (shiftDate.getTime() === tomorrow.getTime()) {
            categories['Tomorrow'].push(shiftWithStatus);
        } else {
            const dateLabel = formatDate(shift.startTime);
            categories[dateLabel] = categories[dateLabel] || [];
            categories[dateLabel].push(shiftWithStatus);
        }
    });
    const nonEmptyCategories = Object.keys(categories)
    .filter(category => categories[category].length > 0)
    .reduce((result, category) => {
        result[category] = categories[category];
        return result;
    }, {});


    return nonEmptyCategories;
};
