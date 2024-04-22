import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function HomepageFeatures() {
  return <div className="homempage-links">
      <div className="homepage-link-container">
        <Heading as="h2">
          <a href="/docs/category/foundry-core">Brane Core</a>
        </Heading>
      </div>
      <div className="homepage-link-container">
        <Heading as="h2">
          <a href="/docs/category/foundry-core">Foundry</a>
        </Heading>
      </div>
    </div>
}
