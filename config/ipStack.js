exports.getIpStackURL = (ip) => {
    return `http://api.ipstack.com/${ip}?access_key=${process.env.IP_STACK_KEY}&format=1`;
};
