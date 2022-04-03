module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    textShadow: {
      'pink': '0.5px 0.5px 0 #ff9dd5',
      'pink-dark': '0.5px 0.5px 0 #ff3395',
    },
    fontFamily: {
      'lucida-handwriting' : ['Lucida Handwriting'],
    },
    fontSize: {
      'responsive-personalization' : '1.7vw',
    },
    extend: {
      backgroundImage: {
        'pintauñas': "url('./static/Landing1-1280x720.png')",
        'pintauñas-big': "url('./static/Landing1-1920x1080.png')",
        'logo-completo': "url('./static/Logo-Completo.png')",
        'logo-inicial': "url('./static/Logo-Inicial.png')",
        'botes-landing': "url('./static/Landing2.png')",
        'chica-landing': "url('./static/landing3.jpg')",
        'ESCULPIDA': "url('./static/ESCULPIDA.PNG')",
        'NATURAL': "url('./static/NATURAL.PNG')",
        'DUAL_SYSTEM': "url('./static/DUAL_SYSTEM.PNG')",
        'GEL': "url('./static/GEL.PNG')",
        'ACRILICO': "url('./static/ACRILICO.PNG')",
        'ACRYGEL': "url('./static/ACRYGEL.PNG')",
        'SEMIPERMANENTE': "url('./static/SEMIPERMANENTE.PNG')",
        'SEMIPERMANENTE_REFUERZO': "url('./static/SEMIPERMANENTE_REFUERZO.PNG')",
        'JAPONESA': "url('./static/mockButtonPhoto.jpg')",
        'SQUARE': "url('./static/SQUARE.PNG')",
        'ROUND': "url('./static/ROUND.PNG')",
        'SQUOVAL': "url('./static/SQUOVAL.PNG')",
        'ALMOND': "url('./static/ALMOND.PNG')",
        'STILETTO': "url('./static/STILETTO.PNG')",
        'BALLERINA': "url('./static/BALLERINA.PNG')",
        'XXS': "url('./static/mockButtonPhoto.jpg')",
        'XS': "url('./static/mockButtonPhoto.jpg')",
        'S': "url('./static/mockButtonPhoto.jpg')",
        'M': "url('./static/mockButtonPhoto.jpg')",
        'L': "url('./static/mockButtonPhoto.jpg')",
        'XL': "url('./static/mockButtonPhoto.jpg')",
        'XXL': "url('./static/mockButtonPhoto.jpg')",
        'RELLENO': "url('./static/mockButtonPhoto.jpg')",
        'FRANCESA_REVERSA': "url('./static/FRANCESA_REVERSA.PNG')",
        'BABY_BOOMER': "url('./static/BABY_BOOMER.PNG')",
        'DEGRADADO_COLOR': "url('./static/DEGRADADO_COLOR.PNG')",
        'ENCAPSULADO': "url('./static/ENCAPSULADO.PNG')",
        'LISAS': "url('./static/LISAS.PNG')",
        'DIBUJO': "url('./static/DIBUJO.PNG')",
        'DISNEY_COLOR': "url('./static/DISNEY_COLOR.PNG')",
        'DISNEY_BOCETO': "url('./static/DISNEY_BOCETO.PNG')",
        'TRANSFER_FOIL': "url('./static/TRANSFER_FOIL.PNG')",
        'PIEDRAS': "url('./static/PIEDRAS.PNG')",
        'PIERCING': "url('./static/PIERCING.PNG')",
        'PEGATINAS': "url('./static/PEGATINAS.PNG')",
        'STANPING': "url('./static/STANPING.PNG')",
        'PAN_DE_ANGEL': "url('./static/PAN_DE_ANGEL.PNG')",
        'EFECTO_HUEVO': "url('./static/EFECTO_HUEVO.PNG')",
        'EFECTO_PIEDRA': "url('./static/EFECTO_HUEVO.PNG')",
        'FRANCESA': "url('./static/FRANCESA.PNG')",
        'BURBUJAS': "url('./static/BURBUJAS.PNG')",
        'SUGAR': "url('./static/SUGAR.PNG')",
        'EFECTO_RELIEVE': "url('./static/EFECTO_RELIEVE.PNG')",
        'ESPEJO': "url('./static/ESPEJO.PNG')",
        'HOLOGRAFICO': "url('./static/HOLOGRAFICO.PNG')",
        'MARMOL': "url('./static/MARMOL.PNG')",
        'MATE': "url('./static/MATE.PNG')",
        'BRILLO': "url('./static/BRILLO.PNG')",
      },
      height: {
        'responsiveButtonHeight': '128px',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
