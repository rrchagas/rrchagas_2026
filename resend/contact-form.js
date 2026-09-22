document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.blahlab_contact_form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.value;

    if (!name || !email || !message) {
      alert('Preencha todos os campos.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.value = 'Enviando...';

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Comentário enviado com sucesso!');
        form.reset();
      } else {
        alert(data.error || 'Erro ao enviar. Tente novamente.');
      }
    } catch (err) {
      alert('Erro de conexão. Tente novamente.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.value = originalText;
    }
  });
});
