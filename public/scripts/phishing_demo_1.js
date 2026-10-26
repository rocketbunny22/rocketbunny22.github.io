
    const nextBtn = document.getElementById('nextBtn');
    const revealBtn = document.getElementById('revealBtn');
    const resetBtn = document.getElementById('resetBtn');
    const badResult = document.getElementById('teachPanel');
    const goodResult = document.getElementById('goodResult');
    const fields = document.querySelectorAll('.field');

    function showTeachingPoints() {
      badResult.style.display = "block";
    }

    function resetDemo() {
      badResult.style.display = "none";
      goodResult.classList.remove('show');
      fields.forEach(field => field.value = '');
    }

    nextBtn.addEventListener('click', showTeachingPoints);
    revealBtn.addEventListener('click', showTeachingPoints);
    resetBtn.addEventListener('click', resetDemo);
