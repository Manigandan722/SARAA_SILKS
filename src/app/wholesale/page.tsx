import styles from './Wholesale.module.css';

export default function WholesalePage() {
  return (
    <div className={`container ${styles.wholesaleContainer}`}>
      <h1 className={styles.title}>Wholesale Enquiry</h1>
      <p className={styles.subtitle}>We are proud manufacturers of women's nighties. Contact us for bulk orders at factory prices.</p>
      
      <form className={styles.wholesaleForm} action="#">
        <div className={styles.formGroup}>
          <label>Business Name</label>
          <input type="text" className={styles.inputField} required />
        </div>
        <div className={styles.formGroup}>
          <label>Contact Person</label>
          <input type="text" className={styles.inputField} required />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Mobile Number</label>
            <input type="tel" className={styles.inputField} required />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" className={styles.inputField} required />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Interested Products</label>
          <select className={styles.selectField}>
            <option>Women's Nighties</option>
            <option>Sarees</option>
            <option>Chudithar</option>
            <option>Men's Wear</option>
            <option>Kids Wear</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Message / Requirements</label>
          <textarea rows={4} className={styles.textareaField}></textarea>
        </div>
        <button type="button" className={`btn btn-primary ${styles.submitBtn}`}>Submit Enquiry</button>
      </form>
    </div>
  );
}
