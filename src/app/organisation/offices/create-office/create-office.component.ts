import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganisationService } from '../../organisation.service';
import * as _moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'mifosx-create-office',
  templateUrl: './create-office.component.html',
  styleUrls: ['./create-office.component.scss']
})

export class CreateOfficeComponent implements OnInit {
  officeForm: FormGroup;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  constructor(private formBuilder: FormBuilder, private organisationService: OrganisationService, private router: Router) { }

  ngOnInit() {
    this.createOfficeForm();
  }

  createOfficeForm() {
    this.officeForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'parentId': ['', Validators.required],
      'openingDate': ['', Validators.required],
      'externalId': [''],
    });
  }

  submit() {
    const officeFormValue = this.officeForm.value;
    officeFormValue.locale = 'en';
    officeFormValue.dateFormat = 'dd MMMM yyyy';
    officeFormValue.openingDate = _moment(officeFormValue.openingDate).startOf('day').format('DD MMM YYYY');
    this.organisationService.createOffice(officeFormValue).subscribe(response => {
      this.router.navigate(['/organisation/manage-offices/view', response.officeId]);
    }
    );
  }
}
