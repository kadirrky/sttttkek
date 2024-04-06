export default client => {
    const userTimers = new Map();

 
    client.on('voiceStateUpdate', async (oldState, newState) => {
        // const userId = newState.member.id;

        // if (!oldState.channel && newState.channel) {
        //     // Kullanıcı bir ses kanalına katıldı
        //     userTimers.set(userId, Date.now());
        // } else if (oldState.channel && !newState.channel) {
        //     // Kullanıcı bir ses kanalından ayrıldı
        //     userTimers.delete(userId);
        // }
    });
}