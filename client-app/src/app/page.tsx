import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome</h1>
        <Link href="/login">Go to Login Page</Link>
      </main>
    </div>
  );
}
