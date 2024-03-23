export const shortenTitle = (title, maxLength) => {
    if (title) {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
    }
    return title;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
};

export const optionsMovie = [
    {
        value: "Action",
        label: "Action",
        id: 28
    },
    {
        value: "Adventure",
        label: "Adventure",
        id: 12
    },
    {
        value: "Animation",
        label: "Animation",
        id: 16
    },
    {
        value: "Comedy",
        label: "Comedy",
        id: 35
    },
    {
        value: "Crime",
        label: "Crime",
        id: 80
    },
    {
        value: "Documentary",
        label: "Documentary",
        id: 99
    },
    {
        value: "Drama",
        label: "Drama",
        id: 18
    },
    {
        value: "Family",
        label: "Family",
        id: 10751
    },
    {
        value: "Fantasy",
        label: "Fantasy",
        id: 14
    },
    {
        value: "Horror",
        label: "Horror",
        id: 27
    },
    {
        value: "Music",
        label: "Music",
        id: 10402
    },
    {
        value: "Romance",
        label: "Romance",
        id: 10749
    },
    {
        value: "Science Fiction",
        label: "Science Fiction",
        id: 878
    },
    {
        value: "Thriller",
        label: "Thriller",
        id: 53
    },
    {
        value: "Western",
        label: "Western",
        id: 37
    },
];

export const optionsSeries = [
    {
        value: "Action & Adventure",
        label: "Action & Adventure",
        id: 10759
    },
    {
        value: "Animation",
        label: "Animation",
        id: 16
    },
    {
        value: "Comedy",
        label: "Comedy",
        id: 35
    },
    {
        value: "Crime",
        label: "Crime",
        id: 80
    },
    {
        value: "Documentary",
        label: "Documentary",
        id: 99
    },
    {
        value: "Drama",
        label: "Drama",
        id: 18
    },
    {
        value: "Family",
        label: "Family",
        id: 10751
    },
    {
        value: "Kids",
        label: "Kids",
        id: 10762
    },
    {
        value: "Mistery",
        label: "Mistery",
        id: 9648
    },
    {
        value: "News",
        label: "News",
        id: 10763
    },
    {
        value: "Reality",
        label: "Reality",
        id: 10764
    },
    {
        value: "Sci-Fi & Fantasy",
        label: "Sci-Fi & Fantasy",
        id: 10765
    },
    {
        value: "Soap",
        label: "Soap",
        id: 10766
    },
    {
        value: "Western",
        label: "Western",
        id: 37
    },
];
