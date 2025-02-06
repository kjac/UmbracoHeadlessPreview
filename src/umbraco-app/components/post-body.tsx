import styles from "./post-body.module.css";

type Props = {
  content: string;
};

export default function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto" umb-preview-edit="content">
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
