
const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

export const categorizedShifts = (data) => {
    const sortedShifts = data &&data.length>0 && [...data].sort((a, b) => a.startTime - b.startTime);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const categories = {
        'Today': [],
        'Tomorrow': []
    };

    sortedShifts && sortedShifts.length >0 && sortedShifts.forEach(shift => {
        const shiftDate = new Date(shift.startTime);
        shiftDate.setHours(0, 0, 0, 0);

        if (shiftDate.getTime() === today.getTime()) {
            categories['Today'].push(shift);
        } else if (shiftDate.getTime() === tomorrow.getTime()) {
            categories['Tomorrow'].push(shift);
        } else {
            const dateLabel = formatDate(shift.startTime);
            categories[dateLabel] = categories[dateLabel] || [];
            categories[dateLabel].push(shift);
        }
    });
    console.log(categories,"SSS")
    return categories;
}
