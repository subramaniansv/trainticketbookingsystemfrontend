export const formatDate = (value) => {
    if (Array.isArray(value)) {
        const [year, month, date] = value;
        return `${date} - ${month} - ${year}`;
    }
    if (typeof value === "string") {
        // expect "yyyy-MM-dd" (optionally with time)
        const [year, month, day] = value.split("T")[0].split("-");
        return `${day} - ${month} - ${year}`;
    }
    return "";
}

export const formatTime = (value) => {
    if (Array.isArray(value)) {
        const [hour, minute] = value;
        return `${hour > 9 ? "" : 0}${hour} : ${minute > 9 ? "" : 0}${minute}`;
    }
    if (typeof value === "string") {
        // expect "HH:mm" or "HH:mm:ss"
        const [hour, minute] = value.split(":");
        return `${hour} : ${minute}`;
    }
    return "";
}

export const arrayToDate = (value) => {
    if (Array.isArray(value)) {
        const [year, month, day] = value;
        return new Date(year, month - 1, day);
    }
    return new Date(value);
};