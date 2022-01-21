package za.co.idealsolutions.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "applicants")
public class Applicant {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "first_name")
	private String firstName;

    @Column(name = "last_name")
	private String lastName;

    @Column(name = "mobile")
	private String mobile;

    @Column(name = "email")
	private String email;

    @Column(name = "gender_id")
	private long genderId;

    @Column(name = "position_id")
	private long positionId;

    @Column(name = "highest_qualification_id")
	private long highestQualificationId;

    @Column(name = "desired_location_id")
	private long desiredLocationId;

    @Column(name = "salary")
	private double salary;

	public Applicant() {

	}

	public Applicant(String firstName, String lastName, String mobile, String email, long genderId, long positionId, long highestQualificationId, long desiredLocationId, double salary) {
		this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.email = email;
        this.genderId = genderId;
        this.positionId = positionId;
        this.highestQualificationId = highestQualificationId;
        this.desiredLocationId = desiredLocationId;
        this.salary = salary;
	}

	public long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

    public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

    public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

    public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

    public long getGenderId() {
		return genderId;
	}
	public void setGenderId(long genderId) {
		this.genderId = genderId;
	}

    public long getPositionId() {
		return positionId;
	}
	public void setPositionId(long positionId) {
		this.positionId = positionId;
	}

    public long getHighestQualificationId() {
		return highestQualificationId;
	}
	public void setHighestQualificationId(long highestQualificationId) {
		this.highestQualificationId = highestQualificationId;
	}

    public long getDesiredLocationId() {
		return desiredLocationId;
	}
	public void setDesiredLocationId(long desiredLocationId) {
		this.desiredLocationId = desiredLocationId;
	}

    public double getSalary() {
		return salary;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}

	@Override
	public String toString() {
		return "Applicant [" 
        + "id=" + id 
        + ", first_name=" + firstName
        + ", last_name=" + lastName
        + ", mobile=" + mobile
        + ", email=" + email
        + ", gender_id=" + genderId
        + ", position_id=" + positionId
        + ", highest_qualification_id=" + highestQualificationId
        + ", desired_location_id=" + desiredLocationId
        + ", salary=" + salary 
        + "]";
	}
}
