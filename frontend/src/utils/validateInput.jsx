import zxcvbn from "zxcvbn"

export default function validateInput({ input, type }) {
  const regex = {
    text: /^[a-zA-Z0-9_]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  }
  // To Do : revoir les messages d'erreur ( plus court, ...)
  switch (type) {
    case "userName":
      if (input.value.length < 3) {
        throw new Error(
          "Le nom d'utilisateur doit contenir au moins 3 caractères"
        )
      }
      if (!regex.text.test(input.value)) {
        throw new Error(
          "Les noms d'utilisateur ne doivent contenir que des lettres, des chiffres ou des traits de soulignement."
        )
      }
      return true
    case "email":
      if (!regex.email.test(input.value)) {
        throw new Error("Format de l'email invalide")
      }
      return true

    case "password": {
      if (input.value.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères")
      }
      const { score } = zxcvbn(input.value)
      if (score < 3) throw new Error("Le mot de passe est trop faible")
      return true
    }

    default:
      throw new Error("La saisie est incorrecte")
  }
}
