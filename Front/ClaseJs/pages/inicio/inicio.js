document.addEventListener('DOMContentLoaded', () => {
    const shoulders = document.querySelectorAll('.shoulder');
    const chests = document.querySelectorAll('.chest');
    const arms = document.querySelectorAll('.arm');
    const legs = document.querySelectorAll('.leg');
    const abss = document.querySelectorAll('.abs');
    const backs = document.querySelectorAll('.back');

    const elementHover = (elements) => {
        elements.forEach(element => {
            element.addEventListener('mouseover', () => {
                elements.forEach(e => e.classList.add('highlight'));
            });
            element.addEventListener('mouseout', () => {
                elements.forEach(e => e.classList.remove('highlight'));
            });
        });
    }

    elementHover(shoulders);
    elementHover(chests);
    elementHover(arms);
    elementHover(legs);
    elementHover(backs);
    elementHover(abss);

    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

});
