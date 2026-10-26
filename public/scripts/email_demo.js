
    const emailRow = document.getElementById('emailRow');
    const emailDetail = document.getElementById('emailDetail');
    const verifyLink = document.getElementById('verifyLink');
    const warningNote = document.getElementById('warningNote');

    emailRow.addEventListener('click', function (event) {
      event.preventDefault();
      emailDetail.classList.add('show');
      setTimeout(() => {
        emailDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });

    verifyLink.addEventListener('mouseenter', function () {
      warningNote.classList.add('show');
    });
