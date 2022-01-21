package za.co.idealsolutions.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "job_listings")
public class JobListing {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "company_name")
	private String companyName;

	@Column(name = "company_description")
	private String companyDescription;

	@Column(name = "position_id")
	private long positionId;

	@Column(name = "position_description")
	private String positionDescription;

	@Column(name = "desired_qualification_id")
	private long desiredQualificationId;

	@Column(name = "location_id")
	private long locationId;

	@Column(name = "salary")
	private double salary;

	public JobListing() {

	}

	public JobListing(String companyName, String companyDescription, long positionId, String positionDescription, long desiredQualificationId, long locationId, double salary) {
		this.companyName = companyName;
		this.companyDescription = companyDescription;
		this.positionId = positionId;
		this.positionDescription = positionDescription;
		this.desiredQualificationId = desiredQualificationId;
		this.locationId = locationId;
		this.salary = salary;
	}

	public long getId() {
		return id;
	}

	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyDescription() {
		return companyDescription;
	}
	public void setCompanyDescription(String companyDescription) {
		this.companyDescription = companyDescription;
	}

	public long getPositionId() {
		return positionId;
	}
	public void setPositionId(long positionId) {
		this.positionId = positionId;
	}

	public String getPositionDescription() {
		return positionDescription;
	}
	public void setPositionDescription(String positionDescription) {
		this.positionDescription = positionDescription;
	}

	public long getDesiredQualificationId() {
		return desiredQualificationId;
	}
	public void setDesiredQualificationId(long desiredQualificationId) {
		this.desiredQualificationId = desiredQualificationId;
	}

	public long getLocationId() {
		return locationId;
	}
	public void setLocationId(long locationId) {
		this.locationId = locationId;
	}

	public double getSalary() {
		return salary;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}

	@Override
	public String toString() {
		return "JobListing [" 
        + "id=" + id 
        + ", company_name=" + companyName
        + ", company_description=" + companyDescription
        + ", position_id=" + positionId
        + ", position_description=" + positionDescription
        + ", desired_qualification_id=" + desiredQualificationId
        + ", location_id=" + locationId
        + ", salary=" + salary 
        + "]";
	}
}
