const store = {
    series: [],
};

export const initStore = () => {
    const savedSeries = localStorage.getItem('gym-series');
    if (savedSeries) {
        store.series = JSON.parse(savedSeries);
    }
};

export const getSeries = () => store.series;

export const addSerie = (serie) => {
    store.series.push(serie);
    localStorage.setItem('gym-series', JSON.stringify(store.series));
};