import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../shared/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [ClientService],
})
export class ClientsComponent implements OnInit {
  columnNames = ['id', 'first_name', 'last_name', 'gender', 'ip_address'];
  clients = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null =
    null;
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    // this.clientsData.sort = this.sort;
    this.clientService.getClients().subscribe((clients) => {
      this.clients.data = clients;
      this.clients.sort = this.sort;
      this.clients.paginator = this.paginator;
    });
  }
}
