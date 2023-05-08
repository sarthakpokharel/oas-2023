import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { AdminlvlService } from './adminlvl.service';
import { Toast} from '../toast-service';
@Component({

  selector: 'app-adminlvl',
  templateUrl: './adminlvl.component.html',
  styleUrls: ['./adminlvl.component.scss']
})
export class AdminlvlComponent implements OnInit {
  @ViewChild('resetbutton') resetbutton:any;
  model: any = {};
  disabled = false;
  error = '';
  lists: any;
  perPages = [10, 20, 50, 100];
  pagination = {
    total: 0,
    currentPage: 0,
    perPage: 0
  };
  searchTerm: string = '';
  column: string = '';
  isDesc: boolean = false;


  adminlvlForm!: FormGroup
  srchForm: FormGroup;

  formLayout: any;

  constructor(private RS: AdminlvlService, private ts: Toast, private fb: FormBuilder) {

    this.formLayout = {
      levelid: [''],
      code: ['', Validators.required],
      levelorder: ['', [Validators.required]],
      levelnameen: ['', [Validators.required]],
      levelnamenp: ['', [Validators.required]],
      levelnamelc: [''],
      approved: ['1'],
      disabled: ['0'],
    };

    this.adminlvlForm = fb.group(this.formLayout)

    this.srchForm = new FormGroup({
      entries: new FormControl('10'),
      srch_term: new FormControl(''),
      
    })

  }

  ngOnInit(): void {
    this.pagination.perPage = this.perPages[0];
    this.getList();
  }



  adminFormSubmit() {

    if (this.adminlvlForm.valid) {
      this.model = this.adminlvlForm.value;
      this.createItem(this.adminlvlForm.value.levelid);
    } else {
      // Object.keys(this.adminlvlForm.controls).forEach(field => {
      //   const singleFormControl = this.adminlvlForm.get(field);
      //   // singleFormControl.markAsTouched({onlySelf: true});
      // });
      this.adminlvlForm.markAllAsTouched();
    }
  }

  createItem(id = null) {

    let upd = this.model;
    if (id != "" && id !=null) {

      this.RS.update(id, upd).subscribe(result => {
         this.ts.show(result);;
        //this.adminlvlForm.reset();
        this.adminlvlForm = this.fb.group(this.formLayout)
        this.getList();
      }, error => {
         this.ts.show(error.error);;
      });
    } else {
      this.RS.create(upd).subscribe(result => {
         this.ts.show(result);;
        //this.adminlvlForm.reset();
        this.adminlvlForm = this.fb.group(this.formLayout)
        this.getList();
      }, error => {
         this.ts.show(error.error);;
      });
    }

  }

  resetForm() {
    this.adminlvlForm = this.fb.group(this.formLayout)
  }

  getList(pageno?: number | undefined) {
    const page = pageno || 1;
    this.RS.getList(this.pagination.perPage, page, this.searchTerm, this.column, this.isDesc).subscribe(
      (result: any) => {
        this.lists = result.data;
        this.pagination.total = result.total;
        this.pagination.currentPage = result.currentPage;
        ///console.log(result);
      },
      error => {
         this.ts.show(error.error);;
      }
    );
  }

  paginatedData($event: { page: number | undefined; }) {
    this.getList($event.page);
  }

  changePerPage(perPage: number) {
    this.pagination.perPage = perPage;
    this.pagination.currentPage = 1;
    this.getList();
  }

  search() {
    this.pagination.perPage=this.srchForm.value.entries;
    this.searchTerm=this.srchForm.value.srch_term;
    this.getList();
  }

  resetFilters() {
    this.isDesc = false;
    this.column = '';
    this.searchTerm = '';
    this.pagination.currentPage = 1;
    this.getList();
  }

  getUpdateItem(id: any) {
    this.RS.getEdit(id).subscribe(
      (result: any) => {
        this.model = result;
        this.adminlvlForm.patchValue(result);
      },
      (error: any) => {
         this.ts.show(error.error);;
      }
    );
  }

  deleteItem(id: any) {
    if (window.confirm('Are sure you want to delete this item?')) {
      this.RS.remove(id).subscribe((result: any) => {
         this.ts.show(result);
        this.getList();
      }, (error: { error: any; }) => {
         this.ts.show(error.error);;
      });
    }
  }
  //removes item from table

}
