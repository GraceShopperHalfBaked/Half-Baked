const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_AfdUEooJQfMOO4gSODXYZWzS00HWjK075Y'
    : 'pk_test_AfdUEooJQfMOO4gSODXYZWzS00HWjK075Y'
export default STRIPE_PUBLISHABLE
