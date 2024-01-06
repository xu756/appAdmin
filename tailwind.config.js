const theme = {
    colors: {
        layout: {
            side: '#e1f4f3',
            area: '#f0f5f9',
            handle: '#30e3ca',
            contain: '#eaeaea',
        },
        area: {
            chatActive: '#c9d6df',
            chatName: '#000000',
            chatLastMessageTime: '#212121',
            chatLastMessage: '#52616b',
        },
    },
};

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: theme,
    },
    darkMode: 'class',
    plugins: [],
};
