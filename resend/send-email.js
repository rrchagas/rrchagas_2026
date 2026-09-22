export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  // validação simples de e-mail
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Enquanto você não verifica um domínio próprio no Resend,
        // use o remetente de testes deles:
        from: 'Blog Plexar <onboarding@resend.dev>',
        to: process.env.TO_EMAIL,
        reply_to: email,
        subject: `Novo comentário de ${name}`,
        html: `
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${String(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      throw new Error(data.message || 'Erro ao enviar e-mail');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao enviar e-mail. Tente novamente mais tarde.' });
  }
}
