
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-project-gallery]').forEach(gallery => {
    const mainContainer = gallery.querySelector('.project-main-image');
    const caption = gallery.querySelector('[data-main-caption]');
    const buttons = [...gallery.querySelectorAll('[data-thumb]')];

    function selectThumbnail(button, index) {
      if (!mainContainer) return;

      const videoSrc = button.dataset.video;
      const img = button.querySelector('img');

      mainContainer.style.opacity = '0.25';

      window.setTimeout(() => {
        if (videoSrc) {
          const video = document.createElement('video');
          video.src = videoSrc;
          video.controls = true;
          video.autoplay = true;
          video.playsInline = true;
          video.preload = 'metadata';
          video.style.width = '100%';
          video.style.height = 'auto';
          video.style.maxHeight = '78vh';
          video.style.objectFit = 'contain';

          const currentMedia = mainContainer.querySelector('[data-main-image], video');
          if (currentMedia) currentMedia.replaceWith(video);
          else mainContainer.prepend(video);

          video.play().catch(() => {});
        } else if (img) {
          const image = document.createElement('img');
          image.src = img.dataset.full || img.src;
          image.alt = img.alt;
          image.setAttribute('data-main-image', '');

          const currentMedia = mainContainer.querySelector('[data-main-image], video');
          if (currentMedia) currentMedia.replaceWith(image);
          else mainContainer.prepend(image);
        }

        if (caption) {
          caption.textContent = button.dataset.caption || `0${index + 1} / SELECTED VISUAL`;
        }

        buttons.forEach(item => {
          item.setAttribute('aria-pressed', String(item === button));
        });

        mainContainer.style.opacity = '1';
      }, 120);
    }

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => selectThumbnail(button, index));
    });
  });
});
