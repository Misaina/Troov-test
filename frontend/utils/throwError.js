export const throwError = (error) => {throw error.response.data.msg || 'Une erreur s\'est produite'};
