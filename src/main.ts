import './styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal') as HTMLDivElement | null;
    const overlay = modal?.querySelector('.modal__overlay') as HTMLDivElement | null;
    const openBtn = document.querySelector('[data-modal-open]') as HTMLButtonElement | null;
    const closeBtn = modal?.querySelector('.modal__close') as HTMLButtonElement | null;
    const videoWrapper = document.getElementById('video-wrapper') as HTMLDivElement | null;
    const YOUTUBE_ID = 'x6iyz1AQhuU';

    if (!modal || !openBtn || !closeBtn || !videoWrapper) {
        console.warn('Modal or required elements not found in the DOM');
        return;
    }

    let previouslyFocused: HTMLElement | null = null;

    function openModal() {
        previouslyFocused = document.activeElement as HTMLElement;
        modal?.removeAttribute('hidden');

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`;
        iframe.title = 'YouTube video player';
        iframe.setAttribute('aria-label', 'Video introduction to SmartRecruiters');
        iframe.setAttribute('frameborder', '0');
        iframe.allowFullscreen = true;
        iframe.allow =
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.width = '560';
        iframe.height = '315';

        videoWrapper?.appendChild(iframe);

        const firstFocusable = modal?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
    }

    function closeModal() {
        modal?.setAttribute('hidden', 'true');
        if (videoWrapper) {
            videoWrapper.innerHTML = '';
        }
        previouslyFocused?.focus();
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.hasAttribute('hidden') && e.key === 'Escape') {
            closeModal();
        }
    });

    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        const focusableEls = modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableEls.length === 0) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
});

