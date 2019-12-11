import { Component, ViewChildren, AfterViewInit, QueryList, ViewChild, ElementRef } from '@angular/core';
import { ChangelogService, IChange, ChangeType } from 'src/app/services/changelog.service';
import { Version } from 'src/app/version';

@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.scss']
})
export class AddLogComponent implements AfterViewInit {
  public ChangeType = ChangeType;

  public versionName;
  public versionDate;

  @ViewChild('date', {read: ElementRef, static: true}) dateHtml: ElementRef;
  @ViewChildren('change') changesHtml: QueryList<any>;
  public changes: IChange[] = [];

  constructor(private changelogService: ChangelogService) { }

  ngAfterViewInit() {

  }

  addNewChange() {
    const type = ChangeType[this.changesHtml.last.nativeElement.children[0].value] as ChangeType;
    const message = (this.changesHtml.last.nativeElement.children[1] as HTMLInputElement).value;

    // Get & Set Version
    const version = new Version();

    const versionArr = this.versionName.split('.');

    version.setMajor(versionArr[0]);
    version.setMinor(versionArr[1]);
    version.setPatch(versionArr[2]);

    version.setVersion();


    // Add to changes[]
    this.changes.push({
      type,
      message,
      version
    });

    // Clear newChange description
    this.changesHtml.last.nativeElement.children[1].value = '';

  }

  getChanges() {
    console.log(this.changes);
  }

  saveChanges() {
    for (const change of this.changes) {
      this.changelogService.addChange(change);
    }
  }
}
