const SERVICE_TYPES = {
  createUser: Symbol('CreateUser'),
  sessionLogin: Symbol('SessionLogin'),
};

const REPOSITORY_TYPES = {
  user: Symbol('UserRepository'),
};

export { SERVICE_TYPES, REPOSITORY_TYPES };
