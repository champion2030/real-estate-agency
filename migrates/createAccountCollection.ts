// eslint-disable-next-line max-len
import { mongoConnect } from '../src/utils/mongo/connect';
import { accountModel } from '../src/nodes/accounts/services/accounts/account.model';

// eslint-disable-next-line max-len
// npx ts-node -r tsconfig-paths/register migrates/createAccountCollection.ts
const start = async () => {
  await mongoConnect();
  await accountModel.createCollection();
  // eslint-disable-next-line no-console
  console.log('Collection is created!');
};

start()
  .then(() => {
    return process.exit(22);
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  });
