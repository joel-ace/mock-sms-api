export const handleCatchError = res => res.status(500).send({
  message: 'We encountered an error. Please try again later',
});

export const noop = () => {};
