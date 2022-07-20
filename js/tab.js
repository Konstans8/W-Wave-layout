document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.guest__accordion-item').forEach(function(tabBtn) {
        tabBtn.addEventListener('click', function(event) {
        const path = event.currentTarget.dataset.path;

        document.querySelectorAll('.tab__container').forEach(function(tabBlock) {
            tabBlock.classList.remove('tab-content-active')
        })
        document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')
        })
    })
})
